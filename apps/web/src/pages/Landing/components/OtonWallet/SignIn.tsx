
import { StyledInput } from 'pages/AddLiquidity/styled';
import { FormEvent, useState} from 'react';
import styled from 'styled-components'

const FormSection = styled.div`
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background: #007BFF;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;


export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // handle form submission
    };
    return (
        <FormSection>
            <Form onSubmit={handleSubmit}>
              <StyledInput onUserInput={(e)=> setEmail(e)} value={email} type="email" placeholder="Email" required />
              <StyledInput onUserInput={(e)=> setPassword(e)} value={password} type="password" placeholder="Password" required />
              <SubmitButton type="submit">Sign In</SubmitButton>
            </Form>
        </FormSection>
    )
}
  