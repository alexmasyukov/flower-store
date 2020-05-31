import React from 'react';


const SizeInformer = ({ className, diameter }) => {
  return (
    <div className={className}>
      Диаметр букета: <b>{diameter} см</b>
    </div>
  );
};

export default SizeInformer;