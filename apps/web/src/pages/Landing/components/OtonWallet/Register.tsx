
import { FormEvent } from 'react';
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


export function Register() {
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // handle form submission
    };
    return (
        <FormSection>
            <Form onSubmit={handleSubmit}>
            <Input type="text" placeholder="Name" required />
            <Input type="email" placeholder="Email" required />
            <Input type="password" placeholder="Password" required />
            <SubmitButton type="submit">Register</SubmitButton>
            </Form>
        </FormSection>
    )
}