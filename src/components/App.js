import React from 'react';
import data from '../data';
import Typeahead from './Typeahead';

function App(props) {
    // TODO!
    console.log(data)
    return (
        <>
            <Typeahead 
                books={data.books} 
                handleSelect = {(books) => {
                    window.alert(books)
                }} 
            />
        </>
    );
}

export default App;
