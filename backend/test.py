import requests

url = 'http://127.0.0.1:8000/get_video_analysis/'
response = requests.get(url)                                                                                                                                                                                                                    
if response.status_code == 200:                                                                                            
    # Successful request
    print(response.json())  # Assuming the response is JSON
else:                                                                                                                       
    # Handle error                                                                                                          
    print(f"Error: {response.status_code}")