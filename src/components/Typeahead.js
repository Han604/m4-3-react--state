import React from 'react';
import styled from 'styled-components'

const StyledInput = styled.input`
    border-radius: 3px;
    margin: 10px 2.5px 10px 10px;
    border: 1px solid grey;
    padding: 5px;
`
const StyledButton = styled.button`
    border-radius: 3px;
    margin: 10px 10px 10px 2.5px;
    background-color: blue;
    color: white;
    border: none;
    padding: 6px;
`

const StyledList = styled.ul`
    list-style-type: none;
    font-family: 'Roboto', sans-serif;
    padding: 10px;
    margin: 0;
    box-shadow: 0px 0px 2px 2px lightgrey;
    width: 330px;
`

const StyledListItem = styled.li`
    width: 300px;
    background-color: white;
    height: 50px;
    padding: 15px;

    &:hover {
        background-color: pink;
    }
`
const StyledSpan = styled.span`
    font-weight:bold;
`

const Typeahead = ({ books, handleSelect}) => {
    const [search, setSearch] = React.useState('');
    const [searchIndex, setSearchIndex] = React.useState(0);
    let foundBooks = [];
    if (search.length >= 2) {
        foundBooks = books.filter(book => book.title.includes(search));
    }
    if (foundBooks.length > 0){
        return (
            <>
                <StyledInput
                    onChange={ev => {
                        setSearch(ev.target.value)
                    }}
                    value={search}
                    type='text' 
                    placeholder='Search'
                    onKeyDown={ev => {
                        switch (ev.key) {
                            case 'Enter': {
                                handleSelect(ev.target.value);
                                return;
                            }
                            case 'ArrowUp': {
                                setSearchIndex (searchIndex - 1);
                                return;
                            }
                            case 'ArrowDown': {
                                setSearchIndex (searchIndex + 1);
                                return;
                            }
                        }
                    }}
                />  
                <StyledButton onClick={() => setSearch('')}>Clear</StyledButton>
                <StyledList>
                    {foundBooks.map((book, index) => {
                        let firstIndex = book.title.indexOf(search);
                        let lastIndex = firstIndex + search.length;
                        let firstHalf = book.title.slice(0, firstIndex)
                        let secondHalf = book.title.slice(lastIndex)
                        let boldItem = book.title.slice(firstIndex, lastIndex)
                        let isSelected = index === searchIndex;
                        return (
                            <StyledListItem 
                                key={book.id}
                                style={{
                                    background: isSelected ? 'hsla(50deg, 100%, 80%, 0.25)' : 'transparent',
                                }}
                                onMouseEnter={() => setSearchIndex(index)}
                                onClick={() => setSearch(book.title)}>
                                    {firstHalf}<StyledSpan>{boldItem}</StyledSpan>{secondHalf}
                            </StyledListItem>
                        )
                    })}
                </StyledList>
            </>
        )
    } else {
        return (
            <StyledInput
                    onChange={ev => {
                        setSearch(ev.target.value)
                    }}
                    value={search}
                    type='text' 
                    placeholder='Search'
                    onKeyDown={ev => {
                        if (ev.key === 'Enter') {
                            handleSelect(ev.target.value)
                        }
                    }}
                />  
        )
    }
}


export default Typeahead;