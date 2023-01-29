import { Button } from '@mui/material';
import React from 'react';

function User({ _id, name, blocked, blockUser, unblockUser }) {
  return (
    <div>
      {name}
      {blocked ? (
        <>
          {' '}
          is Blocked
          <Button onClick={() => unblockUser(_id)} color='secondary'>
            Unblock
          </Button>
        </>
      ) : (
        <>
          {' '}
          is Active
          <Button onClick={() => blockUser(_id)} color='error'>
            Block
          </Button>
        </>
      )}
    </div>
  );
}

export default User;
