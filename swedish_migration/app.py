from time import sleep
import requests, json
from bs4 import BeautifulSoup
from translate import Translator
from datetime import datetime
import csv

URL = "https://www.migrationsverket.se/English/Contact-us/Check-your-application-without-logging-in.html?sv.12.2e150b9f1743f689cbff0.route=/ansokningar&sv.target=12.2e150b9f1743f689cbff0&arendeNrTyp=KONTROLLNR&arendeNr="

def urlCaller(id):
   url = URL + id
   response = requests.get(url)
   soup = BeautifulSoup(response.text, 'html.parser')
   return soup

# soup = urlCaller("59481171")

# # page = requests.get(URL)

# # soup = BeautifulSoup(page.content, "html.parser")

# results = soup.find(id="svid12_2e150b9f1743f689cbff0")

# # print(results.prettify())
# output = json.loads(results.text)

def printDetails(output):
   dt = datetime.now()
   ts = datetime.timestamp(dt)
   date_time = datetime.fromtimestamp(ts)

   # Convert from Swedish to English
   translator= Translator(to_lang="en", from_lang="sv")
   translation = translator.translate(output['arenden'][0]['status'])

   # Getting the current date and time
   print(date_time.strftime("%d-%m-%Y, %H:%M:%S"))
   print("Registration Date: " + output['arenden'][0]['registreringsdatum'])
   print(output['arenden'][0]['arendeNr'])
   print(translation)

   if translation == "Decided":
      print("Decision Date - " + output['arenden'][0]['beslutdatum'])


# Check if there is an active application
# if output["arendeNrTyp"] == "KONTROLLNR":
#    printDetails()
# else:
#    print("No results found")

def recursiveCall():
   startId = 59481171
   endId = 59611171
   with open('output.csv', 'w', encoding='UTF8') as csvfile:
      for i in range(startId, endId):
         soup = urlCaller(str(i))
         results = soup.find(id="svid12_2e150b9f1743f689cbff0")
         output = json.loads(results.text)

         if output["arendeNrTyp"] == "KONTROLLNR":
            printDetails(output)

            # Convert from Swedish to English
            translator= Translator(to_lang="en", from_lang="sv")
            translation = translator.translate(output['arenden'][0]['status'])
            fieldnames = ['arendeNr', 'status', 'registreringsdatum', 'beslutdatum']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            # writer.writeheader()
            writer.writerow({'arendeNr': output['arenden'][0]['arendeNr'], 'status': translation, 'registreringsdatum': output['arenden'][0]['registreringsdatum'], 'beslutdatum': output['arenden'][0]['beslutdatum']})
         else:
            print("No results found")
         sleep(10)


recursiveCall()