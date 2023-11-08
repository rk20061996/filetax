const savePI=`
INSERT INTO taxpayers VALUES(null, ?,  ?,  ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), ?)`;

const updatePI=`UPDATE taxpayers
SET primaryTaxPayer_LastName=?, primaryTaxPayer_FirstName=?, primaryTaxPayer_MiddleName=?, primaryTaxPayer_MaritalStatus=?, primaryTaxPayer_DateOfMarriage=?, primaryTaxPayer_DateOfBirth=?, primaryTaxPayer_SSN_ITIN=?, primaryTaxPayer_CurrentVisaCategory=?, primaryTaxPayer_CurrentOccupation=?, primaryTaxPayer_FirstEntryToUS=?, spouse_FirstDate=?, spouse_FirstName=?, spouse_MiddleName=?, spouse_MaritalStatus=?, spouse_DateOfMarriage=?, spouse_DateOfBirth=?, spouse_SSN_ITIN=?, spouse_CurrentVisaCategory=?, spouse_CurrentOccupation=?, spouse_FirstEntryToUS=?,status=? WHERE id=?;
`
const gettaxInformation = `Select * from taxpayers where user_id = ?`

const saveContact=`
INSERT INTO taxcontactdetails VALUES(null, ?,  ?,  ?, ?,  ?, ?, ?, ?, ?, ?, ?, now())`;

const getcontactDetails = `Select * from taxcontactdetails where user_id = ?`

const updateContact = `UPDATE taxcontactdetails SET currentStreetAddress = ?, aptNumber = ?, city = ?, state = ?, zipCode = ?, country = ?, emailId = ?, mobileNumber = ?, workNumber = ?, status = ? WHERE id = ?`
// ;

const savedependent=`
INSERT INTO taxdependentdetails VALUES(null, ?,  ?,  ?, ?,  ?, ?, ?, ?, ?, ?, ?, now())`;

const getdependentDetails = `Select * from taxdependentdetails where user_id = ?`

const updateDependent = `UPDATE taxdependentdetails SET firstName = ?, middleName = ?, lastName = ?, ssnItin = ?, visaCategory = ?, dateOfBirth = ?, relationship = ?, firstDateOfEntry = ?, dependantCareExpenses = ?, status = ? WHERE id = ?`


const saveresidency =`
INSERT INTO residencydetails VALUES(null, ?,  ?,  ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())`;

const getresidencyDetails = `Select * from residencydetails where user_id = ?`

const updateResidency =`UPDATE residencydetails SET payerStateName1 = ?, spouseStateName1 = ?, payerResidencyStartDate1 = ?, spouseResidencyStartDate1 = ?, payerResidencyEndDate1 = ?, spouseResidencyEndDate1 = ?, payerRentPaidAnnual1 = ?, spouseRentPaidAnnual1 = ?, payerStateName2 = ?, spouseStateName2 = ?, payerResidencyStartDate2 = ?, spouseResidencyStartDate2 = ?, payerResidencyEndDate2 = ?, spouseResidencyEndDate2 = ?, payerRentPaidAnnual2 = ?, spouseRentPaidAnnual2 = ?,status = ? WHERE id = ?`


module.exports = {
    savePI,
    gettaxInformation,
    updatePI,
    saveContact,
    getcontactDetails,
    updateContact,
    savedependent,
    getdependentDetails,
    updateDependent,
    saveresidency,
    getresidencyDetails,
    updateResidency
};