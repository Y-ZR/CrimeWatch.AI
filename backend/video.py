import os
import shutil
from datetime import datetime
from typing import Literal

import cv2
import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import FastAPI
from google.generativeai.types import HarmCategory, HarmBlockThreshold

# Get api key from .env file
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

cwd = os.getcwd()
FRAME_EXTRACTION_DIRECTORY = cwd + "/frames"
FRAME_PREFIX = "_frame"

app = FastAPI()


class File:
    def __init__(self, file_path: str, display_name: str = None):
        self.file_path = file_path
        if display_name:
            self.display_name = display_name
        self.timestamp = get_timestamp(file_path)

    def set_file_response(self, response):
        self.response = response


def create_frame_output_dir(output_dir: str) -> None:
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    else:
        shutil.rmtree(output_dir)
        os.makedirs(output_dir)


# Create frames from video
def extract_frame_from_video(video_file_path: str) -> None:
    print(f"Extracting {video_file_path} at 1 frame per second. This might take a while...")
    create_frame_output_dir(FRAME_EXTRACTION_DIRECTORY)
    vidcap = cv2.VideoCapture(video_file_path)
    fps = vidcap.get(cv2.CAP_PROP_FPS)
    frame_duration = 1 / fps  # Time interval between frames (in seconds)
    output_file_prefix = os.path.basename(video_file_path).replace('.', '_')
    frame_count = 0
    count = 0
    while vidcap.isOpened():
        success, frame = vidcap.read()
        if not success:  # End of video
            break
        if int(count / fps) == frame_count:  # Extract a frame every second
            min = frame_count // 60
            sec = frame_count % 60
            time_string = f"{min:02d}:{sec:02d}"
            image_name = f"{output_file_prefix}{FRAME_PREFIX}{time_string}.jpg"
            output_filename = os.path.join(FRAME_EXTRACTION_DIRECTORY, image_name)
            cv2.imwrite(output_filename, frame)
            frame_count += 1
        count += 1
    vidcap.release()  # Release the capture object\n",
    print(f"Completed video frame extraction!\nExtracted: {frame_count} frames")


def get_timestamp(filename: str):
    parts = filename.split(FRAME_PREFIX)
    if len(parts) != 2:
        return None  # Indicates the filename might be incorrectly formatted
    return parts[1].split('.')[0]


def create_prompt(prompt_type: Literal["real_time", "deeper_analysis"], real_time_output: str = None) -> str:
    # Real-time
    if prompt_type == "real_time":
        agent_role = "You are a professional in the security sector." \
                     "You understand crime well and know what to look out for when crime happens and how to analyse them. \n"

        query_preamble = "I will give you a video showing CCTV footage of a retail shop. " \
                         "The video is split into frames, with 1 frame representing 1 second of time. " \
                         "The frames, together with its timestamp will be given to you. " \
                         "I want you to analyse the video and tell me if anything suspicious is happening in the video. " \
                         "Common suspicious events are customers stealing items, carrying weapons or threating the staff. " \
                         "I want you to give me detailed analysis of the situation. " \
                         "I expect 3-5 sentences to describe the event in depth. " \
                         "Events should also last less than 10 seconds. If it is longer than that, split into multiple events. " \
                         "Do not give me analysis of the feelings of the people, just give me straight facts. \n"

        # query_example_input = "For example, I could give you a video with a customer stealing a laptop from 00:30 to 00:40 as input. "
        # query_example_output = "You could output: {'suspicious_activity': True, 'events': {1: {description: 'Customer stealing a laptop', time: '00:30 to 00:40'}}}. " \
        #                        "This example is overly simplified. I want you to output a detailed analysis of the situation. \n"

        query_setup = "Now, generate a JSON dictionary for the CCTV video. "
        query_detail = "I want you to give me the output as a JSON dictionary with keys suspicious_activity and events. " \
                       "suspicious_activity is a boolean that is True when there are suspicious activities in the video. " \
                       "events is a dictionary with key as a number and value as a dictionary with keys description and time of the suspicious events that happened. " \
                       "description should be a 3-5 sentences of in depth factual analysis of the situation and time should be the time when it happened eg 00:30-00:40. " \
                       "If no suspicious events happened, it should be an empty dictionary. " \
                       "Do not use markdown, any other formatting, or any other commentary in your answer. \n" \
                       "Your answer: \n"

        return agent_role + query_preamble + query_setup + query_detail
    # Deeper analysis
    elif prompt_type == "deeper_analysis":
        agent_role = "You are a professional in the security sector." \
                     "You understand crime well and know what to look out for when crime happens and how to analyse them. \n"

        query_preamble = "I will give you a video showing CCTV footage of a retail shop. " \
                         "The video is split into frames, with 1 frame representing 1 second of time. " \
                         "The frames, together with its timestamp will be given to you. " \
                         "You have already given me the real-time analysis of the video and I have identified this video as suspicious. " \
                         f"This was the real-time analysis that you gave me: {real_time_output}."

        query_setup = "I want you to give me a deeper and more detailed analysis of the video. " \
                      "Tell me what is happening in the video and give me a detailed analysis of the situation. " \
                      "Give me remedies to the situation and how to prevent it from happening in the future. "

        query_detail = "Do not use markdown, any other formatting, or any other commentary in your answer. \n" \
                       "Your answer: \n"

        return agent_role + query_preamble + query_setup + query_detail
    else:
        print("Invalid prompt type")
        raise ValueError("Invalid prompt type")


def make_request(prompt: str, files: list[File]) -> list:
    request = [prompt]
    for file in files:
        request.append(file.timestamp)
        request.append(file.response)
    return request


def call_gemini_for_analysis(prompt_type: Literal["real_time", "deeper_analysis"], real_time_output: str = None) -> str:
    # Check if frames exist
    if not os.path.exists(FRAME_EXTRACTION_DIRECTORY) or len(os.listdir(FRAME_EXTRACTION_DIRECTORY)) == 0:
        print("No frames found. Extracting frames from video...")
        video_file_name = cwd + "/mp4_converted_video.mp4"
        extract_frame_from_video(video_file_name)

    # Process each frame in the output directory
    files = os.listdir(FRAME_EXTRACTION_DIRECTORY)
    print(f"Found {len(files)} files in {FRAME_EXTRACTION_DIRECTORY}")
    files = sorted(files)
    files_to_upload = []
    for file in files:
        files_to_upload.append(File(file_path=os.path.join(FRAME_EXTRACTION_DIRECTORY, file)))
    print(f"Processed {len(files_to_upload)} files")

    # Upload the files to the API
    # Only upload a 10 second slice of files to reduce upload time.
    # Change full_video to True to upload the whole video.
    full_video = True

    uploaded_files = []
    print(f'Uploading {len(files_to_upload) if full_video else 10} files. This might take a while...')

    for file in files_to_upload if full_video else files_to_upload[:10]:
        print(f'Uploading: {file.file_path}...')
        response = genai.upload_file(path=file.file_path)
        file.set_file_response(response)
        uploaded_files.append(file)

    print(f"Completed file uploads!\nUploaded: {len(uploaded_files)} files")

    # List files uploaded in the API
    for n, f in zip(range(len(uploaded_files)), genai.list_files()):
        print(f.uri)

    prompt = create_prompt(prompt_type, real_time_output)

    # Set the model to Gemini 1.5 Pro.
    model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

    # Make the LLM request
    request = make_request(prompt, uploaded_files)
    response = model.generate_content(request,
                                      request_options={"timeout": 600},
                                      safety_settings={
                                          HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
                                      })
    try:
        print(f"Text: {response.text}")
    except ValueError:
        # If the response doesn't contain text, check if the prompt was blocked.
        print(response.prompt_feedback)
        # Also check the finish reason to see if the response was blocked.
        print(response.candidates[0].finish_reason)
        # If the finish reason was SAFETY, the safety ratings have more details.
        print(response.candidates[0].safety_ratings)

    return response.text


@app.get("/video_analysis/")
async def video_analysis():
    """
    Extract frames from a video, upload frames and make a request to the API to generate JSON analysis of the video.

    :return: Analysis in JSON format

    To run, add GOOGLE_API_KEY to .env file. Then, run the following commands:
    cd backend
    uvicorn video:app --reload
    Go to http://127.0.0.1:8000/docs for FastAPI interface.
    """
    start_time = datetime.now()
    output = call_gemini_for_analysis("real_time")
    app.state.real_time_output = output
    end_time = datetime.now()
    print(f"Time taken: {end_time - start_time}")

    return output


@app.get("/get_deeper_analysis/")
async def get_deeper_analysis():
    """
    Get deeper analysis of the video.

    :return: Analysis in JSON format

    To run, add GOOGLE_API_KEY to .env file. Then, run the following commands:
    cd backend
    uvicorn video:app --reload
    Go to http://127.0.0.1:8000/docs for FastAPI interface.
    """
    start_time = datetime.now()
    output = call_gemini_for_analysis("deeper_analysis", app.state.real_time_output)
    end_time = datetime.now()
    print(f"Time taken: {end_time - start_time}")

    return output
