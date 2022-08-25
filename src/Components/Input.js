import React from 'react'

const Input = () => {
  return (
    <form className='zipcode-form'>
        <label>
            <input type='text' id='zipcode' name='zipcode' className='zipcode-input' />
        </label>
            <input type='submit' value='OK' />
    </form>
  )
}

export default Input