import React from 'react';

const SupportRequestsList = ({ requests }) => {
  return (
    <div>
      <h2>Список запитів на підтримку</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            <strong>{request.subject}</strong> - {request.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupportRequestsList;
