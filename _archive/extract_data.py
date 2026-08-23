import pandas as pd
import docx

print("--- EXCEL DATA ---")
try:
    df = pd.read_excel('sofi.xlsx')
    print(df.to_string())
except Exception as e:
    print(f"Excel error: {e}")

print("--- WORD DATA ---")
try:
    doc = docx.Document('Carta.docx')
    for para in doc.paragraphs:
        print(para.text)
except Exception as e:
    print(f"Word error: {e}")
