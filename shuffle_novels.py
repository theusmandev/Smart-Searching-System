import pandas as pd

# File paths (r lagana zaroori hai Windows paths ke liye)
input_path = r"C:\Users\PCS\Downloads\urdu_novels_rows.csv"
output_path = r"C:\Users\PCS\Downloads\urdu_novels_mixed.csv"

# 1. Apni download ki hui file load karein
df = pd.read_csv(input_path)

# 2. Rows ko bilkul randomly (100%) shuffle karein
df_shuffled = df.sample(frac=1).reset_index(drop=True)

# 3. Nayi mixed file save karein
df_shuffled.to_csv(output_path, index=False)

print("Data successfully shuffle ho gaya ha aur Downloads folder mein 'urdu_novels_mixed.csv' ke naam se save ho gaya ha!")