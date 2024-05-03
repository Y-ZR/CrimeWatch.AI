import os
import shutil
from datetime import datetime
from typing import Literal

import cv2
import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import FastAPI
from google.generativeai.types import HarmCategory, HarmBlockThreshold
import pickle
# Get api key from .env file
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

cwd = os.getcwd()
FRAME_EXTRACTION_DIRECTORY = cwd + "/frames"
FRAME_PREFIX = "_frame"
UPLOADED_FILES_PATH = cwd + "/uploaded_files.pkl"
# set to change the maximum number of frames/secs to send into gemini from the full video
MAX_FRAMES = 15

REPORTS_DATA = [
  {
    "description": ["A man wearing a hoodie is seen breaking into a parked car and stealing valuables from inside.", "He quickly rummages through the car, grabs a bag, and flees the scene.", "This behavior is indicative of a car burglary, as the individual unlawfully entered the vehicle with the intent to commit theft."],
    "time": "02:45"
  },
  {
    "description": ["Two individuals are observed exchanging small packets in a dimly lit alleyway.", "Their behavior suggests a possible drug deal taking place.", "They quickly exchange items and then disperse in different directions."],
    "time": "19:20"
  },
  {
    "description": ["A group of teenagers is seen vandalizing public property by spray painting graffiti on a building wall.", "They appear to be laughing and taking turns tagging the wall with various graffiti symbols and words.", "This behavior constitutes vandalism and property damage."],
    "time": "23:10"
  },
  {
    "description": ["A woman wearing a pink and blue sari is seen taking a laptop from a shelf and putting it into her bag.", "She looks around cautiously before doing so, suggesting she is aware that she is engaging in suspicious activity.", "This behavior is indicative of shoplifting, as she is concealing merchandise with the intention of leaving the store without paying for it."],
    "time": "00:11"
  },
  {
    "description": ["A masked individual is seen breaking into a house through a window.", "They enter the house and begin to ransack the rooms, taking valuables and electronics.", "This behavior is indicative of a home burglary, as the individual unlawfully entered the residence with the intent to commit theft."],
    "time": "03:30"
  },
  {
    "description": ["A group of individuals is observed engaging in a physical altercation outside a nightclub.", "They are seen exchanging punches and grappling with each other.", "Bystanders attempt to intervene and break up the fight."],
    "time": "01:55"
  },
  {
    "description": ["A person is seen pickpocketing unsuspecting pedestrians in a crowded marketplace.", "They skillfully move through the crowd, discreetly reaching into pockets and bags to steal wallets and valuables.", "This behavior constitutes pickpocketing and theft."],
    "time": "12:40"
  }
]


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
                         "Events should also last less than 5 seconds. If it is longer than that, split into multiple events. " \
                         "Do not give me analysis of the feelings of the people, just give me straight facts. \n"

        # query_example_input = "For example, I could give you a video with a customer stealing a laptop from 00:30 to 00:40 as input. "
        # query_example_output = "You could output: {'suspicious_activity': True, 'events': {1: {description: 'Customer stealing a laptop', time: '00:30 to 00:40'}}}. " \
        #                        "This example is overly simplified. I want you to output a detailed analysis of the situation. \n"

        query_setup = "Now, generate a JSON dictionary for the CCTV video. "
        query_detail = "I want you to give me the output as a JSON dictionary with keys suspicious_activity and events. " \
                       "suspicious_activity is a boolean that is True when there are suspicious activities in the video. " \
                       "events is a dictionary with key as a number and value as a dictionary with keys description and time of the suspicious events that happened. " \
                       "description should be a dictionary with key as a number and value as an in depth factual analysis of the situation and time should be the time when it happened eg 00:30. " \
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

        query_setup = "Now, generate a JSON dictionary for the detailed analysis and suggestions for this situation. "
        query_detail = "I want you to give me the output as a JSON dictionary with keys deeper_analysis and events. " \
                       "deeper_analysis is a dictionary with key as a number and value as a dictionary with keys description and time. " \
                       "suggestions is a dictionary with key as a number and value as a string representing the suggestion. " \
                       "Do not use markdown, any other formatting, or any other commentary in your answer. \n" \
                       "Your answer: \n"

        return agent_role + query_preamble + query_setup + query_detail
    else:
        print("Invalid prompt type")
        raise ValueError("Invalid prompt type")


def create_prompt_for_summary() -> str:
    agent_role = "You are a professional in the security sector." \
                    "You understand crime well and know what to look out for when crime happens and how to analyse them. \n"
    query_preamble = "I will give you a 7 days worth of reports that outline event descriptions of crimes. " \
                        "These descriptions are from video analysis that you performed over CCTV footages. " \
                        "I want you to analyse the event descriptions and give me a summary of the events. " \
                        "The purpose of the summary is to give an overall high-level view of the crime situation. " \
                        "After the summary, provide remediation steps and actionable suggestions for how crimes can be reduced or prevented. " \
                        "Do not give me analysis of the feelings of the people, just give me straight facts. \n"
    query_setup = "Now, generate a JSON dictionary for the events summary and remediation suggestions. "
    query_detail = "I want you to give me the output as a JSON dictionary with keys summary and suggestions. " \
                    "summary is an array of strings that represents the summary of the crime situation in point form. " \
                    "suggestions is an array of strings that represents the remediation steps and actionable suggestions to the user on how they can reduce or prevent crime. " \
                    "These suggestions should not be overly generic, but should be specifically customized to the summary provided and the events description history you analysed. " \
                    "There should always be at least 2 suggestions provided. " \
                    "Do not use markdown, any other formatting, or any other commentary in your answer. \n" \
                    "Your answer: \n"

    return agent_role + query_preamble + query_setup + query_detail


def make_request(prompt: str, files: list[File]) -> list:
    request = [prompt]
    for file in files:
        request.append(file.timestamp)
        request.append(file.response)
    return request

# The response from each get_video_analysis call is a report
def make_request_for_summary(prompt: str, reports: list[dict]) -> list:
    request = [prompt]
    for report in reports:
        print(report)
        request.append(report["time"])
        request.append(" ".join([sentence for sentence in report["description"]]))
    return request


def call_gemini_for_analysis(prompt_type: Literal["real_time", "deeper_analysis"], real_time_output: str = None, frames: int = 15) -> str:
    # Check if frames exist
    if not os.path.exists(FRAME_EXTRACTION_DIRECTORY) or len(os.listdir(FRAME_EXTRACTION_DIRECTORY)) == 0:
        print("No frames found. Extracting frames from video...")
        video_file_name = cwd + "/shoplifting.mp4"
        extract_frame_from_video(video_file_name)
    if os.path.exists(UPLOADED_FILES_PATH):
        file = open(UPLOADED_FILES_PATH,'rb')
        uploaded_files = pickle.load(file)
        file.close()
    else:
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
        filehandler = open(UPLOADED_FILES_PATH,"wb")
        pickle.dump(uploaded_files,filehandler)
        filehandler.close()

    prompt_files = uploaded_files[:frames]

    prompt = create_prompt(prompt_type, real_time_output)

    # Set the model to Gemini 1.5 Pro.
    model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

    # Make the LLM request
    request = make_request(prompt, prompt_files)
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


def call_gemini_for_summary(reports: list[dict]) -> str:
    prompt = create_prompt_for_summary()

    # Set the model to Gemini 1.5 Pro.
    model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

    # Make the LLM request
    request = make_request_for_summary(prompt, reports)
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

    print(response.text)
    return response.text


@app.get("/get_video_analysis/")
async def get_video_analysis():
    """
    Extract frames from a video, upload frames and make a request to the API to generate JSON analysis of the video.

    :return: Analysis in JSON format

    To run, add GOOGLE_API_KEY to .env file. Then, run the following commands:
    cd backend
    uvicorn video:app --reload
    Go to http://127.0.0.1:8000/docs for FastAPI interface.
    """
    start_time = datetime.now()
    output = call_gemini_for_analysis("real_time", frames = MAX_FRAMES)
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

@app.get("/get_summary/")
async def get_summary():
    """
    Takes in desciption of events over past 7 days and returns a summary of the events along with remediation steps

    :return: Analysis in JSON format
    """
    start_time = datetime.now()
    output = call_gemini_for_summary(REPORTS_DATA)
    # app.state.real_time_output = output
    end_time = datetime.now()
    print(f"Time taken: {end_time - start_time}")

    return output
