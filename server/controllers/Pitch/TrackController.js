const { models} = require('../models');


exports.copyEmails = (req, res) => {
    const { fieldName } = req.params; 
      const constantValue = "YES";
      const modificationTime = new Date();
      const fifteenDaysAgo = new Date(modificationTime.getTime() - 15 * 24 * 60 * 60 * 1000);
    
      //find rows where modifiedAt is 15 days ago or more and fieldName is not equal to constantValue
    const query = {
      $or: [
        { modifiedAt: { $exists: false } }, 
        { modifiedAt: { $lte: fifteenDaysAgo } },
      ],
      [fieldName]: { $ne: constantValue },
    };
    
    
      let emailArray; 
    
      // Find documents that match the query
      models.Track.find(query)
        .limit(48) 
        .then(docs => {
          const emailSet = new Set(); 
          const emailIdMap = new Map(); 
    
          docs.forEach(obj => {
            if (obj.Email) {
              // Split multiple emails by a delimiter (e.g., comma or semicolon)
              const emails = obj.Email.split(/[;,]/);
    
              // Trim and add each email to the Set and associate it with _id
              emails.forEach(email => {
                const trimmedEmail = email.trim();
                if (trimmedEmail) {
                  emailSet.add(trimmedEmail);
                  // Store the _id associated with the email in the Map
                  emailIdMap.set(trimmedEmail, obj._id.toString());
                }
              });
            }
          });
    
          // Convert the Set back to an array
          emailArray = Array.from(emailSet);
    
          // Update the rows with the selected _id values to set fieldName to "YES" and modifiedAt to the current time
          const updatePromises = emailArray.map(email =>
            models.Track.updateOne(
              { _id: emailIdMap.get(email) }, // Update based on _id
              { $set: { [fieldName]: constantValue, modifiedAt: modificationTime } }
            )
          );
    
          return Promise.all(updatePromises);
        })
        .then(() => {
          res.json({ eArray: emailArray.slice(0, 48) }); // Limit the response to 48 emails
        })
        .catch(error => {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal server error' });
        });
};

exports.deleteEntries = async (req, res) => {
    const query = {
            Email: { $regex: /form/i },
          };
        
          // Delete rows that match the query
          models.Track.deleteMany(query)
            .then(result => {
              // Check the result to see how many documents were deleted
              const { deletedCount } = result;
              res.json({ message: `${deletedCount} documents deleted successfully.` });
            })
            .catch(error => {
              console.error('Error:', error);
              res.status(500).json({ error: 'Internal server error' });
            });
};

