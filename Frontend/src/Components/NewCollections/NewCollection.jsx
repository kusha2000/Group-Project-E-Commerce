import React, { useEffect, useState } from 'react';
import './NewCollection.css';
import Item from '../Items/Item';
import newCollectionData from '../Assets/new_collections'; // Renamed to avoid conflict

const NewCollection = () => {
    const [newCollection, setNewCollection] = useState([]);

    // Load the data into the state on component mount
    useEffect(() => {
        setNewCollection(newCollectionData);
    }, []);

    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {newCollection.map((item, i) => (
                    <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    );
}

export default NewCollection;
