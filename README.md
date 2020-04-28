# Smyths Toys Stock Notifier :video_game: :phone:

## Inspiration
With the COVID-19 situation, it's been [pretty hard to find a Nintendo Switch](https://www.standard.co.uk/tech/nintendo-switch-back-stock-where-buy-a4424951.html). Most major retailers are sold out, and any stock that comes in is quick to go. Given the lockdown measures, the Nintendo Switch is gaining a lot of popularity. I wanted to buy one, but couldn't...

There are lots of stock informer websites and tools out there, but I found them quite slow to react when retailers added more stock to their websites. Also, an email notification is hardly something that got my attention fast! I would often get all the way to checkout on some retailers only to find that the Switch that was in my basket seconds earlier had since sold out. One website that seemed to keep having small stints of pre-orders for the Nintendo Switch was [Smyths Toys](https://www.smythstoys.com/uk/en-gb).

I decided to sit down for 20 mins or so and write a scraper for their website that refreshed every 20 seconds so that I could quckly get to their website and hopefully complete my purchase! :crossed_fingers:

And the notification? I hooked up the [Twilio API](https://twilio.com) to ring my phone and tell me to check my laptop straight away :phone:

## Did it work?
I wrote this code one evening at ~ 10pm UK time, and by 3pm the next day I had successfully ordered a Nintendo Switch. This code managed to notify me about the stock availability at Smyths about 5 mins before any other stock informer app did - crucial time to complete checkout!

## Disclaimer
This is by far not the best code I have written, and is heavily based on the DOM of the Smyths website at the time of writing - but it worked and achieved what I wanted!

## Usage
To get started, you need to set up a trial Twilio account and [follow the guide on getting a phone number](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account#get-your-first-twilio-phone-number).
* `git clone https://github.com/DanielArthurUK/smyths-stock-notifier.git`
* `cd smyths-stock-notifier`
* Create a new `.env` file based off of the `.sample-env` file:
    * `TWILIO_ACCOUNT_SID` - your Twilio account SID (found on dashboard)
    * `TWILIO_AUTH_TOKEN` - your Twilio account auth token (also found on dashboard)
    * `TWILIO_PHONE_NUMER` - the phone number you bought through Twilio, e.g. `+441234567890`
    * `MY_PHONE_NUMBER` - the phone number you want to ring when items are in stock
* Set up the product URLs you want to track in the `urls` list in `smyths-stock-notifier.js`. The default here are the 3 types of Nintendo Switch that they offer at the time of writing.
* `npm install`
* `npm run build`
* `npm run start`
* That's it! Leave the program running and your phone will ring when a product becomes available to purchase or pre-order! The console logs out which URL is available so click on that and advance to checkout as soon as you can! :running_man:
