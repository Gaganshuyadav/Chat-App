import { body, validationResult, check, param} from "express-validator";
import { errorHandler  } from "./error.js";


//--------- users --------------

//register
const registerValidator = () =>[
    body("name").notEmpty().withMessage("Please Enter Name") ,
    body("username").notEmpty().withMessage("Please Enter Username") ,
    body( "bio", "Please Enter Bio").notEmpty() ,
    body( "password", "Please Enter Password").notEmpty() ,
    body( "confirmPassword", "Please Enter Confirm Password").notEmpty(),
]
    
//login
const loginValidator = () =>[
    body("username").notEmpty().withMessage("Please Enter Username") ,
    body( "password", "Please Enter Password").notEmpty() ,
]

//send request
const sendRequestValidator = () =>[
    body("userId").notEmpty().withMessage("Please Enter User ID"),
];

//accept request
const acceptRequestValidator = ()=>[
    body("accept")
        .notEmpty().withMessage("Please add accept status")
        .notEmpty().isBoolean().withMessage("accept must be a Boolean"),

    body("requestId")
        .notEmpty().withMessage("Please Give Request ID")
        .isLength(24).withMessage("Request ID length should be 24")
];

//---------- chat -----------------

//new group
const newGroupValidator = () =>[
    body( "name", "Please Enter Group Name").notEmpty() ,
    body( "members")
        .notEmpty().withMessage("Please Add Members")
        .isArray().withMessage("it should be an array")
        .isArray( { min:2, max:100}).withMessage("Members must be 2-100") ,
];
    
//add members
const addMembersInGroupValidator = () =>[
    body( "chatId")
        .notEmpty().withMessage("Please Enter Chat ID")
        .isLength(24).withMessage("Chat ID length should be 24"),
    body( "members")
        .notEmpty().withMessage("Please add Members")
        .isArray({ min:1, max:97}).withMessage("Members must be 1-97"),
]

//remove members
const removeMembersValidator = () =>[
    body("chatId")
        .notEmpty().withMessage("Please Enter ChatId")
        .isLength(24).withMessage("Chat ID length should be 24"),
    body("userId")
        .notEmpty().withMessage("Please Enter userId")
        .isLength(24).withMessage("User ID length should be 24"),
];

//send attachments
const sendAttachmentsValidator = () =>[
    body("chatId")
            .notEmpty().withMessage("Please Enter Chat ID")
            .isLength(24).withMessage("Chat ID length should be 24"),
];


//leave Group ,getChatDetails ,renameGroup ,deleteChat ,getMessages
const chatIdValidator = () =>[
    param("id")
        .notEmpty().withMessage("Please Enter Chat Id")
        .isLength(24).withMessage("Chat ID length should be 24"),
]; 


//---------- Admin -----------------

const adminLoginValidator = ()=>[
    body("secretKey").notEmpty().withMessage("Please Enter Secret Key"),
];

//handler for all errors
const validateHandler = ( req, res, next) => {
    
    const error = validationResult(req);

    if(error.isEmpty()){
        next();
    }
    else{
        const errMessages = error.errors.map( (error)=>{
            return error.msg;
        });
        // .join(", ");

        return next(new errorHandler( errMessages[0], 400));
        
    }
}

export { registerValidator, 
         loginValidator, 
         sendRequestValidator,
         acceptRequestValidator,
         newGroupValidator, 
         addMembersInGroupValidator,
         removeMembersValidator,
         sendAttachmentsValidator,
         chatIdValidator,
         adminLoginValidator,
         validateHandler, 
    };
