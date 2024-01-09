let baseApi = "api"
// let baseApi = "http://43.143.3.149:4321"
let token=""
let year="2023"
let userId=1
let selectledger=1
let ledgerInfo=""
let bill="生活账本"
let userInfoData=""
let isFirstLoad=false
let month=new Date().getMonth() + 1

let remind = 0
export default {
	baseApi:baseApi,
	year:year,
	token:token,
	userId:userId,
	selectledger:selectledger,
	bill:bill,
	ledgerInfo:ledgerInfo,
	userInfoData:userInfoData,
	isFirstLoad:isFirstLoad,
	month:month,
	
	setMonth(month){
		this.month=month
	},
	setIsFirstLoad(isFirstLoad){
		this.isFirstLoad=isFirstLoad
	},
	setBill(bill){
		this.bill=bill
	},
	SetSelect(selectledger){
		this.selectledger=selectledger
	},
	SetUserId(userId){
		this.userId=userId
	},
	SetYear(year){
		this.year=year
	},
	SetToken(token){
		this.token=token
	},
	SetledgerInfo(ledgerInfo){
		this.ledgerInfo=ledgerInfo
	},
	SetuserInfoData(userInfoData){
		this.userInfoData=userInfoData
	}
}
