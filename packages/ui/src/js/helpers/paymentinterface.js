export default class PaymentInterface {
  getNonce(cardDetails) {
    throw new Error("You have to implement the method first!");
  }
  getOTP() {
    throw new Error("You have to implement the method first!");
  }
}
