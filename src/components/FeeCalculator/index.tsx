import moment from 'moment'
import React, { useState } from 'react'

const FeeCalculator = () => {
  const [cartValue, setCartValue] = useState<number>(0)
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [dateTime, setDateTime] = useState<string>('')
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if(cartValue >= 100) return 0
    const totalDeliveryFee = surchargeBasedOnCartValue(cartValue) +  getDeliveryFeeForDistanceTraveled + surchargeBasedOnTotalItems(totalItems)
    console.log({totalDeliveryFee})
    if(totalDeliveryFee >= 15) return 15
    return totalDeliveryFee
  }

  const surchargeBasedOnCartValue = (cartValue: number) => cartValue < 10 ? 10 - cartValue : 0

  const isFridayRushHour = (dateAndTime: string): boolean => {
    const isFriday = moment(dateAndTime).utc().day() === 5
    var currentTime = moment(dateAndTime).utc();

    var extra = moment(dateAndTime).utc().format('YYYY-MM-DD') + ' ';
    var start_time = moment(extra + '15:00').utc();
    var end_time = moment(extra + '19:00').utc();
    const isTimeBetweenThreeAndSeven = moment(currentTime).isBetween(start_time, end_time)
    console.log({isFriday, start_time, isTimeBetweenThreeAndSeven, currentTime})
    return isFriday && isTimeBetweenThreeAndSeven ? true : false
  }


  const deliveryFeeOnNormalDays = (distance: number) => {
    if(distance < 1000) return 2
    const noOfFiveHunderdMeters = distance / 500
    return   noOfFiveHunderdMeters % 1 === 0 ? noOfFiveHunderdMeters * 1 : Math.ceil(noOfFiveHunderdMeters * 1)
  }

  const deliveryFeesOnFridayRushHour = (distance: number) =>    deliveryFeeOnNormalDays(distance) * 1.1

  const getDeliveryFeeForDistanceTraveled = isFridayRushHour(dateTime) ? deliveryFeesOnFridayRushHour(deliveryDistance)  : deliveryFeeOnNormalDays(deliveryDistance)

  const surchargeBasedOnTotalItems = (totalItem: number) => {
    if(totalItem <= 4) return 0
    const noOfItemsInWhichSurchargeIsAdded = totalItem - 4
    return noOfItemsInWhichSurchargeIsAdded * 0.50
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Cart value</label>
      <input type="number" name="cartValue" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCartValue(Number(e.target.value))} />
      <label>Delivery distance</label>
      <input type="number" name="deliveryDistance"onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeliveryDistance(Number(e.target.value))} />
      <label>Total items</label>
      <input type="number" name="totalItems" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotalItems(Number(e.target.value))}/>
      <label>Time</label>
      <input type="datetime-local" name="dateTime" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateTime((e.target.value))}/>
      <button>Calculate</button>
    </form>
  )
}

export default FeeCalculator
