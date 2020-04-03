import React, { useState } from 'react'

const DeliveryInfo = () => {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <h4 onClick={() => setVisible(!visible)}>Доставка</h4>
      {
        visible && (
          <>
            Вот здесь информация о доставке,
            скорее всего нужно вынести в отдельный компонент
          </>
        )
      }
    </div>
  );
};

export default DeliveryInfo