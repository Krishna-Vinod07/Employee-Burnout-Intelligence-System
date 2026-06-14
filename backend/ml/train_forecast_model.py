import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.ensemble import RandomForestRegressor

from sklearn.metrics import mean_absolute_error

import joblib

# ==========================================
# LOAD DATASET
# ==========================================

df = pd.read_csv(
    'employee_burnout_dataset.csv'
)

print(
    "Dataset loaded successfully!"
)

# ==========================================
# FEATURES
# ==========================================

X = df[[

    'stress',

    'energy',

    'sleep',

    'workload',

    'activeMinutes',

    'idleMinutes',

    'sessionDuration',

    'activityCount'

]]

# ==========================================
# TARGET
# ==========================================

y = df['futureRiskScore']

# ==========================================
# TRAIN TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(

    X,

    y,

    test_size=0.2,

    random_state=42

)

print(
    "Dataset split complete!"
)

# ==========================================
# MODEL
# ==========================================

model = RandomForestRegressor(

    n_estimators=200,

    random_state=42

)

print(
    "Training forecasting model..."
)

# ==========================================
# TRAIN MODEL
# ==========================================

model.fit(

    X_train,

    y_train

)

print(
    "Forecast model trained!"
)

# ==========================================
# PREDICTIONS
# ==========================================

predictions = model.predict(
    X_test
)

# ==========================================
# EVALUATION
# ==========================================

from sklearn.metrics import (

    mean_squared_error,

    r2_score

)

mae = mean_absolute_error(

    y_test,

    predictions

)

rmse = mean_squared_error(

    y_test,

    predictions

) ** 0.5

r2 = r2_score(

    y_test,

    predictions

)

print(
    f"MAE: {mae:.2f}"
)

print(
    f"RMSE: {rmse:.2f}"
)

print(
    f"R² Score: {r2:.2f}"
)

# ==========================================
# SAVE MODEL
# ==========================================

joblib.dump(

    model,

    'ml/forecast_model.pkl'

)

print(
    "Forecast model saved successfully!"
)