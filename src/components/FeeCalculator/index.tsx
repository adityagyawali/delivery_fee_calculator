import React, { useState } from 'react'

const FeeCalculator = () => {
  const [cartValue, setCartValue] = useState<number>(0)
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [time, setTime] = useState<string>('0')
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if(cartValue >= 100) return 0
    const totalDeliveryFee = surchargeBasedOnCartValue(cartValue) +  getDeliveryFeeForDistanceTraveled + surchargeBasedOnTotalItems(totalItems)
    console.log({totalDeliveryFee})
    if(totalDeliveryFee >= 15) return 15
    return totalDeliveryFee
  }

  const surchargeBasedOnCartValue = (cartValue: number) => cartValue < 10 ? 10 - cartValue : 0

  const isFridayRushHour = (dateAndTime: Date): boolean => false


  const deliveryFeeOnNormalDays = (distance: number) => {
    if(distance < 1000) return 2
    const noOfFiveHunderdMeters = distance / 500
    return   noOfFiveHunderdMeters % 1 === 0 ? noOfFiveHunderdMeters * 1 : Math.ceil(noOfFiveHunderdMeters * 1)
  }

  const deliveryFeesOnFridayRushHour = (distance: number) =>    deliveryFeeOnNormalDays(distance) * 1.1

  const getDeliveryFeeForDistanceTraveled = isFridayRushHour(new Date()) ? deliveryFeesOnFridayRushHour(deliveryDistance)  : deliveryFeeOnNormalDays(deliveryDistance)

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
      <input type="datetime-local" name="time" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime((e.target.value))}/>
      <button>Calculate</button>
    </form>
  )
}

export default FeeCalculator
