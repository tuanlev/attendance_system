exports.deviceQuery = ({
    external_id,
    name,
    description
}) =>  ({
    external_id:(external_id)?external_id:null,
    name : (name)?name:null,
    description:(description)?description:null
     
})
