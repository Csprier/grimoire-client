export const utility = {
  makeNewTagsArray: (tags, existingTags, userId) => {
    if (tags !== undefined) {
      let newTags = {};
      let tagArray = [];

      tags.forEach(tag => {
        newTags[tag] = {
          name: tag,
          userId
        }
      });

      existingTags.forEach(existingTag => {
        if (newTags[existingTag.name]) {
          let temp = newTags[existingTag.name];

          delete newTags[existingTag.name];

          if (existingTag.name === temp.name) {
            tagArray.push(existingTag);
          }
        }
      });

      for (let key in newTags) {
        tagArray.push(newTags[key]);
      }

      let finalizedTags = tagArray.map((tag) => {
        if (tag.id) {
          let formattedTag = {
            _id: tag.id,
            name: tag.name
          }
          return formattedTag;
        } else {
          return tag;
        }
      });
      return finalizedTags;
    } else {
      return [];
    }
  },
  makeNewFolderArray: (folders, existingFolders, userId) => {
    if (folders !== undefined) {
      let newFolders = {};
      let folderArray = [];

      folders.forEach(folder => {
        newFolders[folder] = { 
          name: folder, 
          userId 
        }
      }); 

      existingFolders.forEach(existingFolder => {
        if (newFolders[existingFolder.name]) {
          let temp = newFolders[existingFolder.name];

          delete newFolders[existingFolder.name];

          if (existingFolder.name === temp.name) {
            folderArray.push(existingFolder);
          }
        }
      });

      for (let key in newFolders) {
        folderArray.push(newFolders[key]);
      }

      let finalizedFolders = folderArray.map((folder) => {
        if (folder.id) {
          let formattedFolder = {
            _id: folder.id,
            name: folder.name
          }
          return formattedFolder;
        } else {
          return folder;
        }
      });
      return finalizedFolders;
    } else {
      return [];
    }
  }
};