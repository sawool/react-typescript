import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { authSignoutAsync } from '../modules/authentication';

type ProfileDropdownProps = RouteComponentProps<any> & {
  username?: string;
  email?: string;
};

function ProfileDropdown({ username, email, history }: ProfileDropdownProps) {
  const dispatch = useDispatch();

  const onHandleSingout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(authSignoutAsync.request());
    history.push('/signin');
  };

  return (
    <DropdownButton id="profile-button" title={username} alignRight>
      <Dropdown.Item>{email}</Dropdown.Item>
      <Dropdown.Divider></Dropdown.Divider>
      <Dropdown.Item as="button">
        <div onClick={onHandleSingout}>Sign out</div>
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default withRouter(ProfileDropdown);
