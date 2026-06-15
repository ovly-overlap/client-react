import searchIcon from "../assets/search-icon.svg"
export default function SearchBar({ placeholder, value, onChange, containerStyle }) {
    return(
        <>
        <div style={{ ...style.searchBarContainer, ...containerStyle }}>
            <div style={style.searchBar}>
                <img src={searchIcon} alt="search-icon" />
                <input 
                    type="text" 
                    placeholder={placeholder}
                    style={style.searchInput}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>    
        </>
    )
}

const style = {
    searchBarContainer: {
        width: "100%",
        padding: "0 30px", 
        boxSizing: "border-box",
    },
    searchBar: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--outline-3)",
        borderRadius: "10px",  
        padding: "12px 16px",    
        width: "100%",
        boxSizing: "border-box",
    },
    searchInput: {
        border: "none",
        background: "none",
        outline: "none",  
        width: "100%",
        fontSize: "16px",
        color: "var(--black)",
    },
}
