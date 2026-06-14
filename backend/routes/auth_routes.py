from flask import Blueprint, request
from config.db import db

import bcrypt

auth = Blueprint(
    "auth",
    __name__
)

users = db["users"]

# ==========================================
# REGISTER
# ==========================================

@auth.route(
    "/register",
    methods=["POST"]
)
def register():

    data = request.json

    # GET DATA
    name = data.get("name")

    email = data.get("email")

    password = data.get("password")

    role = data.get("role")

    # NEW
    department = data.get(
        "department"
    )

    # CHECK EXISTING USER
    existing_user = users.find_one({

        "email": email

    })

    if existing_user:

        return {

            "status": "error",

            "message":
                "User already exists"

        }, 400

    # HASH PASSWORD
    hashed_password = bcrypt.hashpw(

        password.encode("utf-8"),

        bcrypt.gensalt()

    )

    # INSERT USER
    result = users.insert_one({

        "name": name,

        "email": email,

        "password": hashed_password,

        "role": role,

        # NEW
        "department": department

    })

    return {

        "status": "success",

        "message":
            "User registered successfully",

        "user": {

            "id":
                str(result.inserted_id),

            "name":
                name,

            "email":
                email,

            "role":
                role,

            # NEW
            "department":
                department

        }

    }


# ==========================================
# LOGIN
# ==========================================

@auth.route(
    "/login",
    methods=["POST"]
)
def login():

    data = request.json

    email = data.get("email")

    password = data.get("password")

    # FIND USER
    user = users.find_one({

        "email": email

    })

    if not user:

        return {

            "status": "error",

            "message":
                "Invalid email"

        }, 401

    # CHECK PASSWORD
    if not bcrypt.checkpw(

        password.encode("utf-8"),

        user["password"]

    ):

        return {

            "status": "error",

            "message":
                "Invalid password"

        }, 401

    return {

        "status": "success",

        "message":
            "Login successful",

        "user": {

            "id":
                str(user["_id"]),

            "name":
                user["name"],

            "email":
                user["email"],

            "role":
                user["role"],

            # NEW
            "department":
                user.get(
                    "department",
                    "Unknown"
                )

        }

    }