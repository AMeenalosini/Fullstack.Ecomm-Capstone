/*****************************************************************************************************************/
/****     This code is to CREATE a SEARCHBAR to filter products based on user input                           ****/
/*****************************************************************************************************************/
/** Step 1: Create a functional component "Searchbar"                                                          ***/
/** Step 2: Accept props for searchParameter and setSearchParameter                                            ***/
/** Step 3: Render an input field to capture user input                                                        ***/
/** Step 4: Update searchParameter on every keystroke                                                          ***/
/*****************************************************************************************************************/
export default function Searchbar(props) {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={props.searchParameter}         // Controlled input value
            onChange={(event) => props.setSearchParameter(event.target.value)}    // Step 4: Update state on change
      />
    </div>
  );
  }

