import fetch from 'node-fetch'
import cheerio from 'cheerio'
import twilio from 'twilio'
import dotenv from 'dotenv'

dotenv.config()

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
const VoiceResponse = twilio.twiml.VoiceResponse

const urls = [
  'https://www.smythstoys.com/uk/en-gb/video-games-and-tablets/nintendo-gaming/nintendo-switch/nintendo-switch-consoles/nintendo-switch-neon-red-blue-with-improved-battery-life/p/182022',
  'https://www.smythstoys.com/uk/en-gb/video-games-and-tablets/nintendo-gaming/nintendo-switch/nintendo-switch-consoles/nintendo-switch-grey-with-improved-battery-life/p/182023',
  'https://www.smythstoys.com/uk/en-gb/video-games-and-tablets/nintendo-gaming/nintendo-switch/nintendo-switch-consoles/nintendo-switch-animal-crossing-limited-edition-console/p/187118'
]

const stockCheck = () => {
  urls.forEach(url => {
    fetch(url)
      .then(resp => resp.text())
      .then(resp => {
          const $ = cheerio.load(resp)
          const deliveryStatus = $('.deliveryType.homeDelivery').text()
          if (deliveryStatus.includes('In Stock')) {
            console.log('PRODUCT IN STOCK:', url)
            ringPhone('One of your watched products is in stock!')
              .then(call => console.log('Twilio call made to', call.sid))
          } else {
            const addToCartButtonText = $('#addToCartButton').text()
            if (addToCartButtonText.includes('Pre-Order')) {
              console.log('AVAILABLE FOR PRE-ORDER:', url)
              ringPhone('One of your watched products is available for pre-order!')
                .then(call => console.log('Twilio call made to', call.sid))
            }
          }
        }
      )
      .catch(err => {
        console.log(err)
      })
  })
  setTimeout(stockCheck, 20000)
}

const ringPhone = msg => {
  const response = new VoiceResponse()
  response.say(msg)
  return twilioClient.calls.create({
    twiml: response.toString(),
    to: process.env.MY_PHONE_NUMBER,
    from: process.env.TWILIO_PHONE_NUMER
  })
}

stockCheck()

