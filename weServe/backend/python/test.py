# import sys

# print("Output from Python")

# fname = sys.argv[1]
# lname = sys.argv[2]

# print("First name: " + fname)
# print("Last name: " + lname)

# print("Hello")

# sys.stdout.flush()

import pandas as pd
from sklearn.cross_validation import train_test_split
import sys

class popularity_recommender_py():
    def __init__(self):
        self.train_data = None
        self.user_id = None
        self.item_id = None
        self.popularity_recommendations = None
        
    #Create the popularity based recommender system model
    def create(self, train_data, user_id, item_id):
        self.train_data = train_data
        self.user_id = user_id
        self.item_id = item_id

        #Get a count of user_ids for each unique movie as recommendation score
        train_data_grouped = train_data.groupby([self.item_id]).agg({self.user_id: 'count'}).reset_index()
        train_data_grouped.rename(columns = {'user_id': 'score'},inplace=True)
    
        #Sort the movies based upon recommendation score
        train_data_sort = train_data_grouped.sort_values(['score', self.item_id], ascending = [0,1])
    
        #Generate a recommendation rank based upon score
        train_data_sort['Rank'] = train_data_sort['score'].rank(ascending=0, method='first')
        
        #Get the top 10 recommendations
        self.popularity_recommendations = train_data_sort.head(10)

    #Use the popularity based recommender system model to
    #make recommendations
    def recommend(self, user_id):    
        user_recommendations = self.popularity_recommendations
        
        #Add user_id column for which the recommendations are being generated
        user_recommendations['user_id'] = user_id
#         user_recommendations['volunteer_id'] = volunteer_id

    
        #Bring user_id column to the front
        cols = user_recommendations.columns.tolist()
        cols = cols[-1:] + cols[:-1]
        user_recommendations = user_recommendations[cols]
        
        return user_recommendations

u_cols = ['user_id', 'user_name', 'city', 'causes']
users = pd.read_csv('C:\Users\DELL\Desktop\SJSU\Sem 1\CMPE272-Ranjan\Final Project\\volunteer.csv', sep=',', names=u_cols, encoding='latin-1')

r_cols = ['user_id', 'opp_id', 'rating']
ratings = pd.read_csv('C:\\Users\DELL\Desktop\SJSU\Sem 1\CMPE272-Ranjan\Final Project\\ratings.csv', sep=',', names=r_cols, encoding='latin-1')

n_cols = ['opp_id', 'opp_name' ,'org_name','location', 'causes']
items = pd.read_csv('C:\\Users\DELL\Desktop\SJSU\Sem 1\CMPE272-Ranjan\Final Project\\ngo.csv', sep=',', names=n_cols, encoding='latin-1')

# print(users.shape)
# print(ratings.shape)
# print(items.shape)

userId = sys.argv[1]
# print("The parameter obtained from the node backend is : "+userId)

train_data, test_data = train_test_split(ratings, test_size = 0.15, random_state=0)
# print(train_data.head(5))
# print(test_data.head(5))

pm = popularity_recommender_py()
pm.create(train_data, 'user_id', 'opp_id')

user_id = userId
# user_id = 917
res = pm.recommend(user_id)

# print(res)
col = res['opp_id']
col = col.reset_index(drop=True)
# print(col)
# print
for i in range(len(col)):
    print(col[i])

sys.stdout.flush()