import React, {Fragment} from 'react';
import './styles.css'

const DescriptionSection = ({name,value}) => {
  return (
    <Fragment>
      <span className='DescriptionSection_name'>{name}:</span>
      <span className='DescriptionSection_value'>{value}</span>
    </Fragment>
  );
};

export default DescriptionSection;