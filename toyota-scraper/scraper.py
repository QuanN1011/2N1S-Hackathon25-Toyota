from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import csv
import time

print('Running...')
URL = "https://www.toyota.com/all-vehicles/" # website url that we are scraping
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get(URL)

time.sleep(5) # give time for JavaScript to load cards

# find elements(data) as lists by using a CSS selector
years = driver.find_elements(By.CSS_SELECTOR, "div.model-year.label-01")
models = driver.find_elements(By.CSS_SELECTOR, "div.title.heading-04")
msrps_or_mpgs = driver.find_elements(By.CSS_SELECTOR, "div.header.body-01")
images = driver.find_elements(By.CSS_SELECTOR, "img[alt='Model image']")

msrps = []
mpgs = []

# since msrps and mpgs share the same class we have to parse them
for element in msrps_or_mpgs:
    text = element.text.strip()
    if "$" in text:
        msrps.append(text)
    elif "/" in text:
        mpgs.append(text)

car_data = [] # list for car data

# keywords to determine style
suv_keywords = ('4Runner', 'bZ', 'Land', 'Sequoia')
car_keywords = ('Camry', 'Corolla', 'Supra', 'GR86', 'Mirai', 'Prius', 'Crown')
crossover_keywords = ('')

# get each element in the lists
for year, model, msrp, mpg in zip(years, models, msrps, mpgs):
    # check styles
    if 'Corolla Cross' in model.text or 'Highlander' in model.text:
        style = 'Hybrid'
    elif any(keyword in model.text for keyword in suv_keywords):
        style = 'SUV'
    elif any(keyword in model.text for keyword in car_keywords):
        style = 'Car'
    elif model.text == 'Sienna':
        style = 'Minivan'
    elif 'Tacoma' in model.text or 'Tundra' in model.text:
        style = 'Truck'

    # print and append to car data list
    print(year.text + '\t' + model.text + '\t' + msrp + '\t' + mpg + '\t' + style)
    car_data.append([year.text, model.text, msrp, mpg, style])

# write to csv file
with open("car_database.csv", "w", newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(['Year', 'Model', 'MSRP', 'MPG', 'Style'])
    writer.writerows(car_data)

driver.quit()
