import React from 'react'
import PropTypes from 'prop-types';
import "./List.scss"

const List = ({ children}) => {
  return (
    <div className='global-list'>
        <div className='list'>{children}</div>
    </div>
  )
}

List.propTypes = {}

export default List