from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import csv
import time
import os
from urllib.parse import urljoin

print('Running...')
URL = "https://www.toyota.com/all-vehicles/" # website url that we are scraping
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get(URL)

time.sleep(5) # give time for JavaScript to load cards

# find elements(data) as lists by using a CSS selector
years = driver.find_elements(By.CSS_SELECTOR, "div.model-year.label-01")
models = driver.find_elements(By.CSS_SELECTOR, "div.title.heading-04")
msrps_or_mpgs = driver.find_elements(By.CSS_SELECTOR, "div.header.body-01")
images = driver.find_elements(By.CSS_SELECTOR, "div.vehicle-card")

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

style = 'Other' # default value

# get each element in the lists
for year, model, msrp, mpg, image in zip(years, models, msrps, mpgs, images):
    time.sleep(0.5)
    # check styles
    if 'Corolla Cross' in model.text or 'Highlander' in model.text:
        style = 'Crossover'
    elif any(keyword in model.text for keyword in suv_keywords):
        style = 'SUV'
    elif any(keyword in model.text for keyword in car_keywords):
        style = 'Car'
    elif model.text == 'Sienna':
        style = 'Minivan'
    elif 'Tacoma' in model.text or 'Tundra' in model.text:
        style = 'Truck' 

    driver.execute_script("arguments[0].scrollIntoView();", image) # scroll to image to lazy load

    image_url = image.get_attribute('data-jelly')

    # print and append to car data list
    print(year.text + '\t' + model.text + '\t' + msrp + '\t' + mpg + '\t' + style + '\t' + image_url)
    car_data.append([year.text, model.text, msrp, mpg, style, image_url])

output_folder = 'backend'
os.makedirs(output_folder, exist_ok=True)

# write to csv file
output_path = os.path.join(output_folder, "car_database.csv")
with open(output_path, "w", newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(['Year', 'Model', 'MSRP', 'MPG', 'Style', 'Image'])
    writer.writerows(car_data)

driver.quit()
