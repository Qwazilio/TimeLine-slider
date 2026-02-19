import styled from "styled-components";

const SomeContainer = styled.div`
    background: #f0f0f0;
    display: flex;
    justify-content: center;
    padding: 2em;
    border-radius: 0.5em;
`;

export default function SomeModule(){
    return (
        <SomeContainer>
            <h1>Some Module</h1>
        </SomeContainer>
    );
}

