// Write your JS code here
import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstNameInput: '',
    lastNameInput: '',
    showFirstNameError: false,
    showLastNameError: false,
    isFormSubmitted: false,
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()
    this.setState({showLastNameError: !isValidLastName})
  }

  onChangeLastName = event => {
    const {target} = event
    const {value} = target

    this.setState({lastNameInput: value})
  }

  renderLastNameField = () => {
    const {lastNameInput, showLastNameError} = this.state
    const className = showLastNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="lastName">
          LAST NAME
        </label>
        <input
          type="text"
          id="lastName"
          value={lastNameInput}
          className={className}
          placeholder="Last name"
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
      </div>
    )
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()
    this.setState({showFirstNameError: !isValidFirstName})
  }

  onChangeFirstName = event => {
    const {target} = event
    const {value} = target

    this.setState({firstNameInput: value})
  }

  renderFirstNameField = () => {
    const {firstNameInput, showFirstNameError} = this.state
    const className = showFirstNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="firstName">
          FIRST NAME
        </label>
        <input
          type="text"
          id="firstName"
          className={className}
          value={firstNameInput}
          placeholder="First name"
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
      </div>
    )
  }

  validateFirstName = () => {
    const {firstNameInput} = this.state
    return firstNameInput !== ''
  }

  validateLastName = () => {
    const {lastNameInput} = this.state
    return lastNameInput !== ''
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()

    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
        isFormSubmitted: false,
      })
    }
  }

  renderRegistrationForm = () => {
    const {showFirstNameError, showLastNameError} = this.state

    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        {this.renderFirstNameField()}
        {showFirstNameError && <p className="error-msg">Required</p>}
        {this.renderLastNameField()}
        {showLastNameError && <p className="error-msg">Required</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    )
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(pervState => ({
      isFormSubmitted: !pervState.isFormSubmitted,
      firstNameInput: '',
      lastNameInput: '',
    }))
  }

  renderSubmissionSuccessView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png "
        alt="success"
        className="success-img"
      />
      <p>Submitted Successfully</p>
      <button
        className="submit-button"
        type="button"
        onClick={this.onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isFormSubmitted} = this.state
    return (
      <div className="registration-form-container">
        <h1 className="form-title">Registration</h1>
        <div className="view-container">
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}
export default RegistrationForm