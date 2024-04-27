import cv2
import os
import shutil
import google.generativeai as genai

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

class File:
  def __init__(self, file_path: str, display_name: str = None):
    self.file_path = file_path
    if display_name:
      self.display_name = display_name
    self.timestamp = get_timestamp(file_path)

  def set_file_response(self, response):
    self.response = response

# Cleanup existinG frames directory
cwd = os.getcwd()
FRAME_EXTRACTION_DIRECTORY = cwd + "\\backend\\frames"
FRAME_PREFIX = "_frame"
def create_frame_output_dir(output_dir):
  if not os.path.exists(output_dir):
    os.makedirs(output_dir)
  else:
    shutil.rmtree(output_dir)
    os.makedirs(output_dir)

# Create frames from video
def extract_frame_from_video(video_file_path):
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
      if not success: # End of video
          break
      if int(count / fps) == frame_count: # Extract a frame every second
          min = frame_count // 60
          sec = frame_count % 60
          time_string = f"{min:02d}:{sec:02d}"
          image_name = f"{output_file_prefix}{FRAME_PREFIX}{time_string}.jpg"
          output_filename = os.path.join(FRAME_EXTRACTION_DIRECTORY, image_name)
          cv2.imwrite(output_filename, frame)
          frame_count += 1
      count += 1
  vidcap.release() # Release the capture object\n",
  print(f"Completed video frame extraction!\nExtracted: {frame_count} frames")

# video_file_name = "https://storage.googleapis.com/generativeai-downloads/data/SherlockJr._10min.mp4"
# extract_frame_from_video(video_file_name)

"""
Extracts the frame count (as an integer) from a filename with the format
'output_file_prefix_frame00:00.jpg'.
"""
def get_timestamp(filename):  
  parts = filename.split(FRAME_PREFIX)
  if len(parts) != 2:
      return None  # Indicates the filename might be incorrectly formatted
  return parts[1].split('.')[0]

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
full_video = False

uploaded_files = []
print(f'Uploading {len(files_to_upload) if full_video else 10} files. This might take a while...')

for file in files_to_upload if full_video else files_to_upload[0:10]:
  print(f'Uploading: {file.file_path}...')
  response = genai.upload_file(path=file.file_path)
  file.set_file_response(response)
  uploaded_files.append(file)

print(f"Completed file uploads!\nUploaded: {len(uploaded_files)} files")

# List files uploaded in the API
for n, f in zip(range(len(uploaded_files)), genai.list_files()):
  print(f.uri)

# Create the prompt.
prompt = "Describe this video."

# Set the model to Gemini 1.5 Pro.
model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

# Make GenerateContent request with the structure described above.
def make_request(prompt, files):
  request = [prompt]
  for file in files:
    request.append(file.timestamp)
    request.append(file.response)
  return request

# Make the LLM request.
request = make_request(prompt, uploaded_files)
response = model.generate_content(request,
                                  request_options={"timeout": 600})
print(response.text)