
from groq import Groq
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)

# ==========================================
# HR RECOMMENDATION
# ==========================================

def generate_hr_recommendation(
    forecast_data,
    escalation
):

    try:

        prompt = f"""
You are an HR AI assistant.

Forecast Data:
{forecast_data}

Burnout Escalation:
{escalation}%

Generate ONE short professional HR recommendation.

Maximum 25 words.
"""

        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.5

        )

        return response.choices[0].message.content

    except Exception as e:

        print("GROQ RECOMMENDATION ERROR:", e)

        return "AI recommendation unavailable."


# ==========================================
# HR ACTION PLAN
# ==========================================

def generate_hr_action_plan(
    forecast_data,
    escalation
):

    try:

        prompt = f"""
You are an HR strategy consultant.

Forecast Data:
{forecast_data}

Burnout Escalation:
{escalation}%

Generate a professional HR action plan.

Return ONLY valid JSON.

Format:

{{
  "summary": "...",

  "immediate": [
    "...",
    "..."
  ],

  "medium": [
    "...",
    "..."
  ],

  "longTerm": [
    "...",
    "..."
  ]
}}
"""

        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.4

        )

        content = response.choices[0].message.content

        print("GROQ RESPONSE:")
        print(content)

        content = content.replace(
            "```json",
            ""
        )

        content = content.replace(
            "```",
            ""
        )

        content = content.strip()

        return json.loads(content)

    except Exception as e:

        print(
            "GROQ ACTION PLAN ERROR:",
            e
        )

        return {

            "summary":
                "Unable to generate AI action plan.",

            "immediate": [

                "Review employee workload",

                "Schedule manager check-ins"

            ],

            "medium": [

                "Launch wellness initiatives",

                "Monitor burnout trends"

            ],

            "longTerm": [

                "Improve workforce planning",

                "Expand employee support programs"

            ]

        }
    
# ==========================================
# WORKFORCE REPORT
# ==========================================

def generate_workforce_report(
    overview_data
):

    try:

        prompt = f"""
You are a senior HR analytics consultant.

Workforce Data:

{overview_data}

Generate a professional workforce report.

Return ONLY valid JSON.

{{
    "summary": "...",

    "keyFindings": [
        "...",
        "...",
        "..."
    ],

    "recommendations": [
        "...",
        "...",
        "..."
    ]
}}
"""

        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.4

        )

        content = response.choices[0].message.content

        print("WORKFORCE REPORT RESPONSE:")
        print(content)

        content = content.replace(
            "```json",
            ""
        )

        content = content.replace(
            "```",
            ""
        )

        content = content.strip()

        return json.loads(content)

    except Exception as e:

        print(
            "WORKFORCE REPORT ERROR:",
            e
        )

        return {

            "summary":
                "Unable to generate workforce report.",

            "keyFindings": [

                "Unable to analyze workforce data."

            ],

            "recommendations": [

                "Review employee wellbeing metrics."

            ]

        }

def generate_employee_recommendation(
    mood_data
):

    try:

        prompt = f"""
You are an employee wellness AI assistant.

Employee Data:

{mood_data}

Provide:

1. One wellness insight.
2. Three actionable recommendations.

Return ONLY valid JSON.

{{
  "insight": "...",

  "recommendations": [
    "...",
    "...",
    "..."
  ]
}}
"""

        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.4

        )

        content = response.choices[0].message.content

        content = content.replace(
            "```json",
            ""
        )

        content = content.replace(
            "```",
            ""
        )

        content = content.strip()

        return json.loads(content)

    except Exception as e:

        print(
            "EMPLOYEE AI ERROR:",
            e
        )

        return {

            "insight":
                "Unable to generate wellness insight.",

            "recommendations": [

                "Maintain healthy work-life balance.",

                "Take regular breaks.",

                "Monitor stress levels."

            ]

        }

