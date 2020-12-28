# Get all posts in r/writingprompts by username

import requests
import requests.auth
import os

# Get access token (expires after 1 hour)
client_auth = requests.auth.HTTPBasicAuth(os.environ['REDDIT_CLIENT_ID'], os.environ['REDDIT_SECRET'])
post_data = {"grant_type": "password", "username": os.environ['REDDIT_USERNAME'], "password": os.environ['REDDIT_PASSWORD']}
headers = {"User-Agent": "ChangeMeClient/0.1 by YourUsername"}
response = requests.post("https://www.reddit.com/api/v1/access_token", auth=client_auth, data=post_data, headers=headers)
access_token = response.json()['access_token']

# Get all top level comments for specified user in the specified subreddit, write each to a file
user = os.environ['REDDIT_COLIN_USERNAME']
subreddit = 'WritingPrompts'
output_directory = 'raw_stories'
headers = {"Authorization": f"bearer {access_token}", "User-Agent": "ChangeMeClient/0.1 by YourUsername"}
after = 'None'
limit = 100 # This is the max
num_comments = limit
while num_comments == limit:
    response = requests.get(f"https://oauth.reddit.com/user/{user}/comments?limit={limit}&after={after}", headers=headers)
    out = response.json()
    after = out['data']['after']
    comments = out['data']['children']
    for comment in comments:
        # If the parent_id and link_id match, this is a top level comment
        if comment['data']['subreddit'] == subreddit and comment['data']['parent_id'] == comment['data']['link_id']:
            filename = f'raw_stories/{comment["data"]["link_id"]}.txt'
            contents = '\n'.join([
                '---',
                f'cat',
                f'title: {comment["data"]["link_title"]}',
                f'date: {comment["data"]["created_utc"]}',
                f'permalink: {comment["data"]["link_permalink"]}',
                'Fantasy: false',
                'Humor: false',
                'SciFi: false',
                'Micro: false',
                'Poem: false',
                '---',
                f'{comment["data"]["body"]}'
            ])
            with open(filename, 'w') as file:
                file.write(contents)
    # Record the number of comments returned from this request. 
    # Once that number drops below the max number that will be returned, the loop will stop.
    num_comments = len(comments)
