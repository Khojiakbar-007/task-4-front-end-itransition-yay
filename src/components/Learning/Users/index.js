import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  blockUserAction,
  fetchUsersAction,
  unblockUserAction,
} from '../../../redux/user/user.actions';
import User from './User';

function Users({ users, fetchUsers, blockUser, unblockUser }) {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      {users?.map((userData) => (
        <User {...userData} blockUser={blockUser} unblockUser={unblockUser} />
      ))}
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.user.users,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsersAction(dispatch)),
  blockUser: (userId) => dispatch(blockUserAction(userId, dispatch)),
  unblockUser: (userId) => dispatch(unblockUserAction(userId, dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
