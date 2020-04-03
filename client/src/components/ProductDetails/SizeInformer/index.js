import React from 'react';


const SizeInformer = ({ className, circle }) => {
  return (
    <div className={className}>
      Диаметр букета: <div>{circle} см</div>
    </div>
  );
};

export default SizeInformer;