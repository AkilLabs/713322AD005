import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTUzNjMzLCJpYXQiOjE3NDMxNTMzMzMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImM5ZDc0MDFkLWQ3ZDAtNDU4Zi1hN2UxLTZlN2RmMjNmOGVjMCIsInN1YiI6ImFraWxhc2thcmFsaUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJTTlMgQ29sbGVnZSBvZiBFbmdpbmVlcmluZyIsImNsaWVudElEIjoiYzlkNzQwMWQtZDdkMC00NThmLWE3ZTEtNmU3ZGYyM2Y4ZWMwIiwiY2xpZW50U2VjcmV0IjoicWptb2h5ekZUR0h6UFNVcCIsIm93bmVyTmFtZSI6IkFraWwgQSIsIm93bmVyRW1haWwiOiJha2lsYXNrYXJhbGlAZ21haWwuY29tIiwicm9sbE5vIjoiNzEzMzIyQUQwMDUifQ.XbtINa82Iv-fjW7KSz22mmVTMgApJLT8OZjWLscMMbY"

HEADERS = {
    "Authorization": f"Bearer {AUTH_TOKEN}"
}

def fetch_users():
    response = requests.get("http://20.244.56.144/test/users", headers=HEADERS)
    response.raise_for_status()
    return response.json().get("users", {})

def fetch_posts(user_id):
    posts_url = f"http://20.244.56.144/test/users/{user_id}/posts"
    response = requests.get(posts_url, headers=HEADERS)
    response.raise_for_status()
    return response.json().get("posts", [])

def fetch_comments(post_id):
    comments_url = f"http://20.244.56.144/test/posts/{post_id}/comments"
    response = requests.get(comments_url, headers=HEADERS)
    response.raise_for_status()
    return response.json().get("comments", [])

@api_view(['GET'])
def top_users(request):
    try:
        users = fetch_users()
        user_post_counts = [
            {"user_id": user_id, "user_name": user_name, "post_count": len(fetch_posts(user_id))}
            for user_id, user_name in users.items()
        ]
        top5_users = sorted(user_post_counts, key=lambda x: x["post_count"], reverse=True)[:5]
        return Response(top5_users, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_posts(request):
    post_type = request.GET.get('type')
    if post_type not in ['popular', 'latest']:
        return Response(
            {"error": "Invalid query param. Use type=popular or type=latest"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        users = fetch_users()
        all_posts = []

        for user_id, user_name in users.items():
            posts = fetch_posts(user_id)
            for post in posts:
                post["user_id"] = user_id
                post["user_name"] = user_name
                post["comment_count"] = len(fetch_comments(post.get("id")))
                all_posts.append(post)

        if post_type == "popular":
            sorted_posts = sorted(all_posts, key=lambda x: x["comment_count"], reverse=True)
        else:
            sorted_posts = sorted(all_posts, key=lambda x: x["id"], reverse=True)

        top_posts = sorted_posts[:5]
        return Response(top_posts, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])
def top_users(request):
    try:
        users = fetch_users()
        user_post_counts = [
            {"user_id": user_id, "user_name": user_name, "post_count": len(fetch_posts(user_id))}
            for user_id, user_name in users.items()
        ]
        top5_users = sorted(user_post_counts, key=lambda x: x["post_count"], reverse=True)[:5]
        return Response(top5_users, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    



@api_view(['GET'])
def get_posts(request):
    post_type = request.GET.get('type')
    if post_type not in ['popular', 'latest']:
        return Response(
            {"error": "Invalid query param. Use type=popular or type=latest"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        users = fetch_users()
        all_posts = []

        for user_id, user_name in users.items():
            posts = fetch_posts(user_id)
            for post in posts:
                post["user_id"] = user_id
                post["user_name"] = user_name
                post["comment_count"] = len(fetch_comments(post.get("id")))
                all_posts.append(post)

        if post_type == "popular":
            sorted_posts = sorted(all_posts, key=lambda x: x["comment_count"], reverse=True)
        else:
            sorted_posts = sorted(all_posts, key=lambda x: x["id"], reverse=True)

        top_posts = sorted_posts[:5]
        return Response(top_posts, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

