import bcrypt from "bcrypt";

const hash = "$2b$10$RIH17pTSA5WM.fvACSSb8OMvFiZeVcK/xG7L6zWLVsRwNF83KRZce";
const plain = "SecurePassword123";

bcrypt.compare(plain, hash).then(result => {
    console.log("Password matches?", result);
});