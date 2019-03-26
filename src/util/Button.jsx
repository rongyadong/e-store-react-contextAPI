import styled from 'styled-components'

export const ButtonContainer = styled.button`
  color: ${props => (props.cart ? 'var(--mainYellow)' : 'var(--lightBlue)')};
  text-transform: capitalize;
  font-size: 1.5rem;
  background: transparent;
  border: 0.05rem solid var(--lightBlue);

  border-color: ${props =>
    props.cart ? 'var(--mainYellow)' : 'var(--lightBlue)'};
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  margin: 0.2rem 0.5rem;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: ${props =>
      props.cart ? 'var(--mainYellow)' : 'var(--lightBlue)'};
    color: ${props => (props.cart ? 'var(--mainWhite)' : 'var(--mainBlue)')};
  }
  &:focus {
    outline: none;
  }
`
