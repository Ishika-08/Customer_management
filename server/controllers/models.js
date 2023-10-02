const ContentsModel = require("../models/Content/Contents")
const ExtraContentsModel = require("../models/Content/ExtraContent")
const DataModel = require("../models/Database")
const TrackModel = require("../models/Track")
const AccountsSchema = require("../models/Accounts")
const CheckLinksModel = require("../models/checkLinks")
const SavedDocumentsModel = require("../models/SavedDocuments")
const {CTModel,H4Model,CanModel,THModel, TPlusModel,FAOModel, FPModel, SCModel, TWModel, VEModel} = require("../models/Website/CT");

const models = {
  SavedDocuments: SavedDocumentsModel,
    Accounts: AccountsSchema,
    checkLinks: CheckLinksModel,
    Track: TrackModel, 
    Contents: ContentsModel,
    ExtraContents: ExtraContentsModel,
    Database: DataModel,
    CT: CTModel,
    H4: H4Model,
    Can: CanModel,
    TH: THModel,
    TPlus: TPlusModel,
    FAO: FAOModel,
    FP: FPModel,
    SC: SCModel,
    TW: TWModel,
    VE: VEModel
  };
  
  const website = {
    CT: CTModel,
    H4: H4Model,
    Can: CanModel,
    TH: THModel,
    TPlus: TPlusModel,
    FAO: FAOModel,
    FP: FPModel,
    SC: SCModel,
    TW: TWModel,
    VE: VEModel
  };
  
  module.exports = {
    models,
    website,
  };

  