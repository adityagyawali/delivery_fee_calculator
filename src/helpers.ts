export const getDeliveryFee = (distance: number) => {
  const noOfFiveHunderdMeters = distance / 500
  return noOfFiveHunderdMeters % 1 === 0 ? noOfFiveHunderdMeters * 1 : Math.ceil(noOfFiveHunderdMeters * 1)
}
