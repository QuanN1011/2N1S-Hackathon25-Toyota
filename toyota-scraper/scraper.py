from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import csv
import time
from urllib.parse import urljoin

print("test")

URL = "https://www.toyota.com/search-inventory/"
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get(URL)

time.sleep(5) # give time for JS to load cards

#models = driver.find_elements(By.CSS_SELECTOR, "div[data-testid='model-tile-name']")
# listings
listings = driver.find_elements(By.CSS_SELECTOR, "a[data-testid='Link'][aria-label^='Select Model']")

listings_urls = [] # all listing urls to scrape data from 
for listing in listings: # loop through each listing to get the listing url
    #print(listing)
    href = listing.get_attribute('href') # listing url
    if not href:
        continue
    full_url = urljoin(URL, href)
    listings_urls.append(full_url)
    #print(href + '\n')

for listing_url in listings_urls: 
    time.sleep(3)
    driver.get(listing_url)
    '''
    models = driver.find_elements(By.CSS_SELECTOR, "div.sc-dRpcpH.bldtFi")
    for model in models:
        print(model.text)
    '''
    prices = driver.find_elements(By.CSS_SELECTOR, "span[data-testid='Typography']")
    for price in prices:
        print(prices + '\n')

        

# print models
'''
for model in models:
    print(model.text)

file = open("scraped_cars.csv", "w") # create csv
writer = csv.writer(file) # writes to csv
'''

# driver.quit()
