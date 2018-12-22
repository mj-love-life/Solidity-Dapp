pragma solidity ^0.4.18;


/**
 * The File_Image_storage contract does this and that...
 */
contract File_Image_storage {

	// Owner
	//struct Owner {
	//	address addr;
	//	uint amount;
	//}
	//  Page
	//	struct Page {
	//		string IPFS_hash;
	//		string Title;
	//		string Emotion;
	//		uint Timestamp;
	//	}
	//

	// picture, Story,
	struct Picture {
		string IPFS_hash;
		string Title;
		// story
		string Description;
		string Type;
		string Emotion;
		uint Timestamp;
	}

	// variable
	Picture [] Picture_Story_List;
	Page [] Page_List;

	// id
	uint [] Story_ids;


	// injection
	mapping (uint => address) Picture_Story_List_Index;
	mapping (uint => address) Page_List_Index;
	mapping (address => uint) Picture_Story_count;
	mapping (address => uint) Page_count;

	// post_picture
	// 参数：ipfs哈希值、title、description、type、emotion
	function Post_Picture (
		string _IPFS_hash,
		string _Title,
		string _Description,
		string _Type,
		string _Emotion) public returns(bool) {
		// requirement
		require (bytes(_IPFS_hash).length == 46);
		require (bytes(_Title).length >0 && bytes(_Title).length <= 256);
		require (bytes(_Description).length <= 1024);
		require (bytes(_Type).length > 0 && bytes(_Type).length <= 256);
		require (bytes(_Emotion).length > 0 && bytes(_Emotion).length <= 256);
		// timestamp
		uint Timestamp = now;
		// new picture
		Picture memory picture = Picture(_IPFS_hash, _Title, _Description, _Type, _Emotion, Timestamp);
		uint index = Picture_Story_List.push(picture) - 1;
		Story_ids.push(index);
		Picture_Story_List_Index[index] = msg.sender;
		Picture_Story_count[msg.sender]++;
		return true;
	}

	// return the count of the picture of the owner
	// 参数：地址
	function Get_Picture_Length (address owner) public view returns(uint) {
		require (owner != 0x0);
		return Picture_Story_count[owner];
	}

	// 获取id值
	function Get_ids() public constant returns(uint []) {
		return Story_ids;
	}

	function Get_Picture_By_id(uint id) public
		returns(uint, string, string, string, string, string, uint) {
		return(
			id,
			Picture_Story_List[id].IPFS_hash,
			Picture_Story_List[id].Title,
			Picture_Story_List[id].Description,
			Picture_Story_List[id].Type,
			Picture_Story_List[id].Emotion,
			Picture_Story_List[id].Timestamp
		);
	}

	// return a picture
	// 传入参数，地址与index
	function Get_Picture (address owner, uint index) public view
		returns(
			string IPFS_hash,
			string Title,
			string Description,
			string Type,
			string Emotion,
			uint Timestamp) {
		require (owner != 0x0);
		require (Picture_Story_count[owner] >= index && index > 0);
		// to store the picture of the owner
		Picture [] memory picture = new Picture [] (Picture_Story_count[owner]);
		uint count = 0;
		for (uint i = 0; i < Picture_Story_List.length; i++) {
			if (Picture_Story_List_Index[i] == owner) {
				picture[count] = Picture_Story_List[i];
				count++;
			}
		}
		uint index1 = index - 1;
		return (
			picture[index1].IPFS_hash,
			picture[index1].Title,
			picture[index1].Description,
			picture[index1].Type,
			picture[index1].Emotion,
			picture[index1].Timestamp
		);
	}

	// share picture to other
	function Share_Picture (
		address other,
		string IPFS_hash,
		string Title,
		string Description,
		string Type,
		string Emotion,
		uint Timestamp) public returns(bool) {
		require (other != 0x0 && other != msg.sender);
		Picture memory picture = Picture(IPFS_hash, Title, Description, Type, Emotion,Timestamp);
		// add to other's account
		uint index = Picture_Story_List.push(picture) - 1;
		Picture_Story_List_Index[index] = other;
		Picture_Story_count[other]++;
		return true;
	}


	// Page
	struct Page {
		string IPFS_hash;
		string Title;
		string Emotion;
		uint Timestamp;
	}

	// post_page
	function Post_Page (
		string _IPFS_hash,
		string _Title,
		string _Emotion) public returns(bool) {
		// reqiurement
		require (bytes(_IPFS_hash).length == 46);
		require (bytes(_Title).length > 0 && bytes(_Title).length <= 256);
		require (bytes(_Emotion).length > 0);
		// timestamp
		uint Timestamp = now;
		Page memory page = Page(_IPFS_hash, _Title, _Emotion, Timestamp);
		uint index = Page_List.push(page) - 1;
		Page_count[msg.sender]++;
		Page_List_Index[index] = msg.sender;
		return true;

	}

	// return the count of the page of the owner
	function Get_Page_Length (address owner) public view returns(uint) {
		require (owner != 0x0);
		return Page_count[owner];
	}

	// return a page
	function Get_Page (address owner, uint index) public view
		returns(
			string _IPFS_hash,
			string _Title,
			string _Emotion,
			uint Timestamp) {
		// requirement
		require (owner != 0x0);
		require (Page_count[owner] >= index && index > 0 );
		uint count = 0;
		// to store the page of the owner
		Page [] memory page = new Page [](Page_count[owner]);
		for (uint i = 0; i < Page_List.length; i++) {
			if (Page_List_Index[i] == owner) {
				page[count] = Page_List[i];
				count++;
			}
		}
		return (
			page[index - 1].IPFS_hash,
			page[index - 1].Title,
			page[index - 1].Emotion,
			page[index - 1].Timestamp
		);
	}
	// share page to other
	function Share_Page (
		address other,
		string _IPFS_hash,
		string _Title,
		string _Emotion,
		uint Timestamp) public returns(bool) {
		require (other != 0x0 && other != msg.sender);
		Page memory page = Page(_IPFS_hash, _Title, _Emotion, Timestamp);
		// add page to other's account
		uint index = Page_List.push(page) - 1;
		Page_List_Index[index] = other;
		Page_count[other]++;
		return true;
	}
}