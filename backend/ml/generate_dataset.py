import pandas as pd
import random

data = []

# ==========================================
# GENERATE DATASET
# ==========================================

for i in range(2000):

    # --------------------------------------
    # WELLNESS FEATURES
    # --------------------------------------

    stress = random.randint(0, 100)

    energy = random.randint(0, 100)

    sleep = random.randint(3, 10)

    workload = random.randint(0, 100)

    active_minutes = random.randint(0, 500)

    idle_minutes = random.randint(0, 300)

    session_duration = random.randint(1, 12)

    activity_count = random.randint(0, 1000)

    # ==========================================
    # CURRENT RISK SCORE
    # ==========================================

    current_risk = (

        (stress * 0.30)

        +

        ((100 - energy) * 0.20)

        +

        ((10 - sleep) * 4)

        +

        (workload * 0.25)

        +

        (idle_minutes * 0.05)

        +

        (session_duration * 1.2)

        -

        (active_minutes * 0.04)

    )

    current_risk = round(current_risk)

    current_risk = max(
        min(current_risk, 100),
        0
    )

    # ==========================================
    # FUTURE RISK
    # ==========================================

    future_risk = current_risk + random.randint(-10, 12)

    if stress > 80:
        future_risk += 8

    if sleep < 5:
        future_risk += 6

    if workload > 80:
        future_risk += 8

    if active_minutes > 350:
        future_risk -= 5

    future_risk = round(future_risk)

    future_risk = max(
        min(future_risk, 100),
        0
    )

    # ==========================================
    # FUTURE PRODUCTIVITY
    # ==========================================

    future_productivity = (

        (energy * 0.45)

        +

        (active_minutes * 0.08)

        -

        (stress * 0.20)

        -

        (idle_minutes * 0.04)

    )

    future_productivity = round(future_productivity)

    future_productivity = max(
        min(future_productivity, 100),
        0
    )

    # ==========================================
    # BURNOUT LABEL
    # ==========================================

    if current_risk >= 80:

        burnout_risk = "Critical"

    elif current_risk >= 60:

        burnout_risk = "High"

    elif current_risk >= 40:

        burnout_risk = "Moderate"

    else:

        burnout_risk = "Low"

    # ==========================================
    # SAVE ROW
    # ==========================================

    data.append({

        "stress": stress,

        "energy": energy,

        "sleep": sleep,

        "workload": workload,

        "activeMinutes": active_minutes,

        "idleMinutes": idle_minutes,

        "sessionDuration": session_duration,

        "activityCount": activity_count,

        "riskScore": current_risk,

        "futureRiskScore": future_risk,

        "futureProductivity": future_productivity,

        "burnoutRisk": burnout_risk

    })

# ==========================================
# SAVE DATASET
# ==========================================

df = pd.DataFrame(data)

print("\nBurnout Distribution:\n")

print(
    df["burnoutRisk"].value_counts()
)

df.to_csv(

    "employee_burnout_dataset.csv",

    index=False

)

print("\nDataset generated successfully!")