from pymongo import MongoClient
from dotenv import load_dotenv
import os

# LOAD ENV
load_dotenv()

# MONGODB URI
MONGO_URI = os.getenv("MONGO_URI")

# CONNECT
client = MongoClient(MONGO_URI)

# DATABASE
db = client["burnout_ai"]