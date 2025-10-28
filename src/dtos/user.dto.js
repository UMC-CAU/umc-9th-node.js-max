export const bodyToUser = (body) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수 
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth, // 필수
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택 
    phoneNumber: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
  };
};//회원가입 요청 dto

export const responseFromUser = ({ user, preferences }) => {
  return {
    id: user[0].id,
    email: user[0].email,
    name: user[0].name,
    gender: user[0].gender,
    birth: user[0].birth,     
    address: user[0].address,
    detailAddress: user[0].detailAddress,
    phoneNumber: user[0].phone_number,
    preferences: preferences.map((pref) => pref.category),
  };
}//회원가입 응답 dto

export const bodyToRestaurant = (body) => {
  return {
    name: body.name, //필수 
    categoryId: body.categoryId, // 필수
    address: body.address, // 필수
    regionId: body.regionId // 필수
  }
}//음식점 추가 요청 dto

export const responseFromRestaurant = ({ restaurant }) => {
  return {
    id: restaurant[0].id,
    name: restaurant[0].name,
    category: restaurant[0].category,
    address: restaurant[0].address,
  };
}//음식점 추가 응답 dto

export const bodyToReview = (body, restaurantId) => {
  return { 
    restaurantId: restaurantId, //필수
    userId: body.userId, //필수
    rate: body.rate, //필수
    reviewText: body.reviewText, //필수
    image: body.image || "" //선택
  };
}//리뷰 작성 요청 dto

export const responseFromReview = ({ review }) => {
  return {
    restaurantId: review[0].restaurant_id,
    restaurantName: review[0].name,
    rate: review[0].rate,
    reviewText: review[0].review_text,
    createdAt: review[0].created_at,
  };
}//리뷰 작성 응답 dto

export const bodyToMission = (body, restaurantId) => {
  return {
    restaurantId: restaurantId, //필수 
    minCost: body.minCost, //필수
    deadline: new Date(body.deadline) //필수
  };
}//미션 추가 요청 dto

export const responseFromMission = ({ mission }) => {
  return {
    restaurantId: mission[0].restaurant_id,
    restaurantName: mission[0].name,
    minCost: mission[0].min_cost,
    deadline: mission[0].deadline,
    createdAt: mission[0].created_at,
  };
}//미션 추가 응답 dto

export const bodyToUserMission = (body, missionId) => {
  return {
    userId: body.userId, //필수
    missionId: missionId, //필수
  };
}//유저미션 추가 요청 dto

export const responseFromUserMission = ({ userMission }) => {
  return {
    id: userMission[0].id,  
    missionId: userMission[0].mission_id,
    userId: userMission[0].user_id, 
    startingDay: userMission[0].starting_day,
  };
}//유저미션 추가 응답 dto
